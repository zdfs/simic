import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import ToolbarPlugin from './plugins/ToolbarPlugin';

const theme = {};

const placeholder = (
	<p className="top-0 absolute pointer-events-none">write a poem...</p>
);

const editorConfig = {
	namespace: 'Simic',
	nodes: [],
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
			<div className="editor-container rounded-xl w-full border p-4">
				<ToolbarPlugin />
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
