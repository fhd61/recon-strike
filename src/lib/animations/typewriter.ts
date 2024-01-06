interface Range {
    textNode: Text;
    range: [number, number];
    text: string;
}

interface TypewriterOptions {
    delay?: number;
    speed?: number;
}

export default function typewriter(node: HTMLElement, { delay = 0, speed = 50 }: TypewriterOptions = {}): {
    delay: number;
    duration: number;
    tick: (t: number) => void;
} {
    const textNodes = getAllTextNodes(node);

    if (!textNodes.length) {
        throw new Error(`This transition only works on elements with text nodes`);
    }

    let totalLength = 0;

    const ranges: Range[] = textNodes.map((textNode) => {
        const range: [number, number] = [totalLength, totalLength + textNode.textContent.length];
        totalLength += textNode.textContent.length;
        const text = textNode.textContent as string;
        textNode.textContent = '';

        return { textNode, range, text };
    });

    let currentRangeIndex = 0;

    function getCurrentRange(i: number): Range {
        while (currentRangeIndex < ranges.length && ranges[currentRangeIndex].range[1] < i) {
            const { textNode, text } = ranges[currentRangeIndex];
            textNode.textContent = text; // finish typing up the last node
            currentRangeIndex++;
        }

        return ranges[currentRangeIndex];
    }

    const duration = totalLength * speed;

    return {
        delay,
        duration,
        tick: (t: number) => {
            const progress = ~~(totalLength * t);
            const { textNode, range, text } = getCurrentRange(progress);
            const [start, end] = range;
            const textLength = ((progress - start) / (end - start)) * text.length;
            textNode.textContent = text.slice(0, textLength);
        },
    };
}

function getAllTextNodes(node: Node): Text[] {
    if (node.nodeType === 3) {
        return [node as Text];
    } else if (node.hasChildNodes()) {
        let list: Text[] = [];
        for (const child of node.childNodes) {
            getAllTextNodes(child).forEach((textNode) => list.push(textNode));
        }
        return list;
    }

    return [];
}
