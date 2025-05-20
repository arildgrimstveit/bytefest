import React, {useCallback} from 'react'
import {Box, Flex, Select} from '@sanity/ui'
import {set} from 'sanity'
import {StringInputProps} from 'sanity'

const hours = Array.from({length: 4}, (_, i) => String(i + 16).padStart(2, '0'))
const minutes = Array.from({length: 12}, (_, i) => String(i * 5).padStart(2, '0'))

const TimeInput = React.forwardRef<HTMLDivElement, StringInputProps>(function TimeInput(props, ref) {
  const {value, readOnly, onChange} = props

  // Parse the ISO string to get hours and minutes
  const date = value ? new Date(value) : new Date('2025-06-05T14:00:00.000Z') // 14:00 UTC = 16:00 Norwegian time
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(Math.floor(date.getMinutes() / 5) * 5).padStart(2, '0')

  const handleHourChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newHour = event.currentTarget.value
      if (!newHour || !minute) return

      // Create date in Norwegian time (UTC+2)
      const newDate = new Date('2025-06-05T14:00:00.000Z')
      newDate.setHours(parseInt(newHour, 10))
      newDate.setMinutes(parseInt(minute, 10))
      onChange(set(newDate.toISOString()))
    },
    [minute, onChange]
  )

  const handleMinuteChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newMinute = event.currentTarget.value
      if (!hour || !newMinute) return

      // Create date in Norwegian time (UTC+2)
      const newDate = new Date('2025-06-05T14:00:00.000Z')
      newDate.setHours(parseInt(hour, 10))
      newDate.setMinutes(parseInt(newMinute, 10))
      onChange(set(newDate.toISOString()))
    },
    [hour, onChange]
  )

  return (
    <Flex gap={2} align="center" ref={ref}>
      <Box flex={1}>
        <Select
          fontSize={2}
          padding={3}
          value={hour}
          onChange={handleHourChange}
          disabled={readOnly}
        >
          <option value="">HH</option>
          {hours.map(h => <option key={h} value={h}>{h}</option>)}
        </Select>
      </Box>
      <Box>:</Box>
      <Box flex={1}>
        <Select
          fontSize={2}
          padding={3}
          value={minute}
          onChange={handleMinuteChange}
          disabled={readOnly}
        >
          <option value="">MM</option>
          {minutes.map(m => <option key={m} value={m}>{m}</option>)}
        </Select>
      </Box>
    </Flex>
  )
})

export default TimeInput 