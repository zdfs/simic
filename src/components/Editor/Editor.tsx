import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { Title } from '../../nodes/Title';
import ToolbarPlugin from '../Toolbar/Toolbar';

import './Editor.css';

const theme = {
	text: {
		bold: 'textBold',
		italic: 'textItalic',
		strikethrough: 'textStrikethrough',
		underline: 'textUnderline',
	},
};

const placeholder = (
	<p className="top-0 absolute pointer-events-none placeholder">
		write a poem...
	</p>
);

const editorConfig = {
	namespace: 'Simic',
	nodes: [Title],
	theme,
	onError,
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
	console.error(error);
}

function Editor() {
	return (
		<LexicalComposer initialConfig={editorConfig}>
			<ToolbarPlugin />
			<div className="editor-container border-r h-max min-h-full p-4 text-gray-100">
				<div className="relative">
					<div className="editor-inner">
						<RichTextPlugin
							contentEditable={<ContentEditable />}
							placeholder={placeholder}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						<HistoryPlugin />
						<AutoFocusPlugin />
					</div>
				</div>
			</div>
		</LexicalComposer>
	);
}

export default Editor;
