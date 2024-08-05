/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import useTailwind from '../../hooks/use-tailwind';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
	$createParagraphNode,
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createTitle, $isTitle } from '../../nodes/Title';
import { getSelectedNode } from '@utils/getSelectedNode';
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	MinusIcon,
	Redo2,
	StrikethroughIcon,
	UnderlineIcon,
	Undo2Icon,
} from 'lucide-react';

import './Toolbar.css';

const LowPriority = 1;

function Divider() {
	return <MinusIcon size={20} color="#999" className="rotate-90 inline" />;
}

export default function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext();
	const toolbarRef = useRef(null);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);

	const tailwind = useTailwind();

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();

		if ($isRangeSelection(selection)) {
			// Update text format
			setIsBold(selection.hasFormat('bold'));
			setIsItalic(selection.hasFormat('italic'));
			setIsUnderline(selection.hasFormat('underline'));
			setIsStrikethrough(selection.hasFormat('strikethrough'));
		}
	}, []);

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				(_payload, _newEditor) => {
					$updateToolbar();
					return false;
				},
				LowPriority
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				LowPriority
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				LowPriority
			)
		);
	}, [editor, $updateToolbar]);

	const formatTitle = () => {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				const node = getSelectedNode(selection);
				console.log(node);
				if ($isTitle(node)) {
					$setBlocksType(selection, () => $createParagraphNode());
				} else {
					$setBlocksType(selection, () => $createTitle());
				}
			}
		});
	};

	return (
		<div
			className="toolbar bg-gray-50 dark:bg-gray-950 z-10 flex space-x-2 p-2 border-r text-gray-100"
			ref={toolbarRef}
		>
			{/* <button
				disabled={!canUndo}
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined);
				}}
				className="toolbar-item"
				aria-label="Undo"
			>
				<Undo2Icon size={16} />
			</button>
			<button
				disabled={!canRedo}
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND, undefined);
				}}
				className="toolbar-item"
				aria-label="Redo"
			>
				<Redo2 size={16} />
			</button>
			<Divider /> */}
			<button onClick={formatTitle}>Title</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
				}}
				className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
				aria-label="Format Bold"
			>
				{/* Need a way to suss out dark mode */}
				<BoldIcon size={16} color={tailwind.theme.colors.gray['50']} />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
				}}
				className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
				aria-label="Format Italics"
			>
				<ItalicIcon
					size={16}
					color={tailwind.theme.colors.gray['50']}
				/>
			</button>
			<button
				disabled={isStrikethrough}
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
				}}
				className={
					'toolbar-item spaced ' + (isUnderline ? 'active' : '')
				}
				aria-label="Format Underline"
			>
				<UnderlineIcon
					size={16}
					color={tailwind.theme.colors.gray['50']}
				/>
			</button>
			<button
				disabled={isUnderline}
				onClick={() => {
					editor.dispatchCommand(
						FORMAT_TEXT_COMMAND,
						'strikethrough'
					);
				}}
				className={
					'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')
				}
				aria-label="Format Strikethrough"
			>
				<StrikethroughIcon
					size={16}
					color={tailwind.theme.colors.gray['50']}
				/>
			</button>
			<Divider />
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
				}}
				className="toolbar-item spaced"
				aria-label="Left Align"
			>
				<AlignLeftIcon
					size={16}
					color={tailwind.theme.colors.gray['50']}
				/>
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
				}}
				className="toolbar-item spaced"
				aria-label="Center Align"
			>
				<AlignCenterIcon
					size={16}
					color={tailwind.theme.colors.gray['50']}
				/>
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
				}}
				className="toolbar-item spaced"
				aria-label="Right Align"
			>
				<AlignRightIcon
					size={16}
					color={tailwind.theme.colors.gray['50']}
				/>
			</button>
			{/* <button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
				}}
				className="toolbar-item"
				aria-label="Justify Align"
			>
				<AlignJustifyIcon size={16} />
			</button>{' '} */}
		</div>
	);
}
