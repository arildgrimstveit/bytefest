'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from './ui/button';
import {
	BoldIcon,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	ItalicIcon,
	ListIcon,
	ListOrderedIcon,
	StrikethroughIcon,
} from 'lucide-react';
import { Separator } from './ui/separator';
import '../styles/styles.css';
import { FC } from 'react';

interface Props {
	content?: string;
	onUpdate?: (content: string) => void;
}

const Tiptap: FC<Props> = ({
	content = 'Content goes here!',
	onUpdate = null,
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
		],
		editorProps: {
			attributes: {
				class: 'p-2 min-h-32',
			},
		},
		onUpdate({ editor }) {
			onUpdate?.(editor.getHTML());
		},
		content: content,
		immediatelyRender: false,
	});

	return (
		<div className="rounded-lg border border-border">
			<div className="flex flex-row items-center space-x-2">
				<Button
					size="sm"
					variant="ghost"
					onClick={() =>
						editor?.chain().focus().toggleHeading({ level: 1 }).run()
					}
				>
					<Heading1Icon className="w-4 h-4" />
				</Button>
				<Button
					size="sm"
					variant="ghost"
					onClick={() =>
						editor?.chain().focus().toggleHeading({ level: 2 }).run()
					}
				>
					<Heading2Icon className="w-4 h-4" />
				</Button>
				<Button
					size="sm"
					variant="ghost"
					onClick={() =>
						editor?.chain().focus().toggleHeading({ level: 3 }).run()
					}
				>
					<Heading3Icon className="w-4 h-4" />
				</Button>
				<Separator orientation="vertical" className="h-4" />
				<Button
					size="sm"
					variant="ghost"
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					<BoldIcon className="w-4 h-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
					<ItalicIcon className="w-4 h-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor?.chain().focus().toggleStrike().run()}
				>
					<StrikethroughIcon className="w-4 h-4" />
				</Button>
				<Separator orientation="vertical" className="h-4" />
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
				>
					<ListIcon className="w-4 h-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
				>
					<ListOrderedIcon className="w-4 h-4" />
				</Button>
			</div>
			<Separator />
			<EditorContent className="tiptap min-h-32" editor={editor} />
		</div>
	);
};

export default Tiptap;
