import React, { useCallback, useMemo } from 'react';
import { Box, Flex, Select } from '@sanity/ui';
import { set, StringInputProps, StringSchemaType } from 'sanity';

export interface TimeInputOptions {
  baseDateString: string;      // YYYY-MM-DD format, e.g., '2025-06-05'
  displayMinHour: number;       // Local hour (0-23)
  displayMaxHour: number;       // Local hour (0-23), if less than displayMinHour, implies crossing midnight
  minuteInterval: number;     // e.g., 5, 15, 30
  defaultDisplayHour: number;   // Default local hour for new entries
  defaultDisplayMinute: number; // Default local minute for new entries
}

// Helper to pad numbers with leading zero if needed
const pad = (num: number): string => String(num).padStart(2, '0');

// TimeInputInternalProps inherits value, onChange, readOnly etc. from StringInputProps
interface TimeInputInternalProps extends Omit<StringInputProps<StringSchemaType>, 'schemaType' | 'elementProps'> {
  options: TimeInputOptions; // Custom options, validated by the parent
}

const TimeInputInternal = React.forwardRef<HTMLDivElement, TimeInputInternalProps>((props, ref) => {
  const { value, readOnly, onChange, options } = props; // onChange is now the original Sanity patch handler

  const { 
    baseDateString, 
    displayMinHour,
    displayMaxHour,
    minuteInterval,
    defaultDisplayHour,
    defaultDisplayMinute 
  } = options;

  const hourOptions = useMemo(() => {
    const hrs: string[] = [];
    if (displayMinHour <= displayMaxHour) {
      for (let i = displayMinHour; i <= displayMaxHour; i++) {
        hrs.push(pad(i));
      }
    } else {
      // Crosses midnight
      for (let i = displayMinHour; i <= 23; i++) {
        hrs.push(pad(i));
      }
      for (let i = 0; i <= displayMaxHour; i++) {
        hrs.push(pad(i));
      }
    }
    return hrs;
  }, [displayMinHour, displayMaxHour]);

  const minuteOptions = useMemo(() => {
    const mins: string[] = [];
    for (let i = 0; i < 60; i += minuteInterval) {
      mins.push(pad(i));
    }
    return mins;
  }, [minuteInterval]);

  const getDefaultDate = useCallback(() => {
    const initialDate = new Date(`${baseDateString}T${pad(defaultDisplayHour)}:${pad(defaultDisplayMinute)}:00`);
    return new Date(initialDate.toISOString());
  }, [baseDateString, defaultDisplayHour, defaultDisplayMinute]);

  const currentDate = useMemo(() => (value ? new Date(value) : getDefaultDate()), [value, getDefaultDate]);
  
  const currentDisplayHour = pad(currentDate.getHours());
  const currentDisplayMinute = pad(Math.floor(currentDate.getMinutes() / minuteInterval) * minuteInterval);

  const handleChange = useCallback((newHourStr?: string, newMinuteStr?: string) => {
    const hr = parseInt(newHourStr || currentDisplayHour, 10);
    const min = parseInt(newMinuteStr || currentDisplayMinute, 10);

    const targetDate = new Date(baseDateString);
    targetDate.setHours(0,0,0,0);

    if (displayMaxHour < displayMinHour && hr <= displayMaxHour) {
        if (!(currentDate.getDate() > new Date(baseDateString).getDate() && hr > displayMaxHour) ){
             targetDate.setDate(targetDate.getDate() + 1);
        }
    }

    targetDate.setHours(hr);
    targetDate.setMinutes(min);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);
    
    // onChange expects a patch. set() creates a FormSetPatch.
    onChange(set(targetDate.toISOString()));
  }, [currentDisplayHour, currentDisplayMinute, onChange, baseDateString, displayMinHour, displayMaxHour, currentDate]);

  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(event.currentTarget.value, undefined);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(undefined, event.currentTarget.value);
  };

  return (
    <Flex gap={2} align="center" ref={ref}>
      <Box flex={1}>
        <Select
          fontSize={2}
          padding={3}
          value={currentDisplayHour}
          onChange={handleHourChange}
          disabled={readOnly}
        >
          <option value="">HH</option>
          {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
        </Select>
      </Box>
      <Box>:</Box>
      <Box flex={1}>
        <Select
          fontSize={2}
          padding={3}
          value={currentDisplayMinute}
          onChange={handleMinuteChange}
          disabled={readOnly}
        >
          <option value="">MM</option>
          {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
        </Select>
      </Box>
    </Flex>
  );
});

TimeInputInternal.displayName = 'TimeInputInternal';

const TimeInput = React.forwardRef<HTMLDivElement, StringInputProps<StringSchemaType>>((props, ref) => {
  const { schemaType, ...rest } = props; // Spread rest of the props including onChange, value, readOnly etc.
  const options = schemaType.options as TimeInputOptions | undefined;

  if (!options || typeof options.baseDateString !== 'string') { 
    return (
      <Box padding={3}>
        <p>TimeInput configuration is missing or invalid in schema options.</p>
      </Box>
    );
  }
  // Pass all original props (except schemaType which is handled) and the validated custom options
  return <TimeInputInternal {...rest} options={options} ref={ref} />;
});

TimeInput.displayName = 'TimeInput';

export default TimeInput; 