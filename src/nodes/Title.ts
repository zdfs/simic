import { ElementNode, LexicalNode } from 'lexical';

export class Title extends ElementNode {
	static getType(): string {
		return 'title';
	}

	static clone(node: Title): Title {
		return new Title(node.__key);
	}

	createDOM(): HTMLElement {
		const dom = document.createElement('h1');
		dom.className =
			'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white';

		return dom;
	}

	updateDOM(_prevNode: Title, _dom: HTMLElement) {
		return false;
	}
}

export function $createTitle(): Title {
	return new Title();
}

export function $isTitle(node: LexicalNode | null | undefined): node is Title {
	const parent = node?.getParent();
	return parent instanceof Title;
}
