import { WIDGET_FRAME_WIDTH_RANGE_LIST, CONTAINER_MIN_WIDTH } from '@/services/dashboards/dashboard-detail/lib/config';


const widgetFrameSizeRangeExtractor = (size: string, containerWidth: number = CONTAINER_MIN_WIDTH): Array<number> => {
    if (size === 'SM') return WIDGET_FRAME_WIDTH_RANGE_LIST[0];
    if (size === 'MD') return WIDGET_FRAME_WIDTH_RANGE_LIST[1];
    if (size === 'LG') return WIDGET_FRAME_WIDTH_RANGE_LIST[2];
    if (size === 'XL') return WIDGET_FRAME_WIDTH_RANGE_LIST[3];
    // WIDGET_FRAME_WIDTH_RANGE_LIST length 의 길이로, ${containerWidth} 로만 이루어진 배열을 return
    if (size === 'FULL') return WIDGET_FRAME_WIDTH_RANGE_LIST[0].map(() => containerWidth);
    return [0];
};


const selectAllWidgetFrameWidthRange = (widgetFrameSizeList: Array<string>, containerWidth: number): Array<Array<Array<number>>> => {
    // 각 line 의 widgetFrame width 를 저장하여 return 할 배열
    const allWidgetFrameWidthRange: Array<Array<Array<number>>> = [];
    // shift() 수행하기 때문에 미리 length 저장해두어야 함.
    const widgetFrameSizeListLength = widgetFrameSizeList.length;

    // 한 개 line 의 widgetFrame width 합을 비교할 배열
    let rowWidthSum = 0;
    // 한 개 line 의 widgetFrame width 를 저장할 배열
    let rowWidgetFrameWidthRange: Array<Array<number>> = [];

    for (let i = 0; i < widgetFrameSizeListLength; i += 1) {
        // widgetFrame 를 한 개 씩 추출함.
        const selectedWidgetFrameSize: Array<number> = widgetFrameSizeRangeExtractor(widgetFrameSizeList.shift() as string, containerWidth);
        rowWidthSum += selectedWidgetFrameSize[0];
        // 한 개 line 의 widgetFrame size 합과 containerWidth 를 비교하여 최댓값을 push 한 후 shift 한 카드의 기본값으로 초기화합니다.
        if (rowWidthSum > containerWidth) {
            allWidgetFrameWidthRange.push(rowWidgetFrameWidthRange);
            rowWidgetFrameWidthRange = [];
            rowWidthSum = selectedWidgetFrameSize[0];
        }
        // 한 개 줄에 가용 가능한 widgetFrame size 합의 최댓값을 구해야하기 때문에, 비교 구문 이후 push 를 합니다.
        rowWidgetFrameWidthRange.push(selectedWidgetFrameSize);
    }

    // 마지막 줄에 한 개의 widgetFrame 이 배치됐다면, 누락됨. 따라서 마지막 원소를 고려함.
    if (rowWidgetFrameWidthRange.length) allWidgetFrameWidthRange.push(rowWidgetFrameWidthRange);

    return allWidgetFrameWidthRange;
};


const allWidgetFrameWidthReAligner = (allWidgetFrameWidthRange: Array<Array<Array<number>>>, containerWidth: number): Array<Array<number>> => {
    const widthSelectPointer: Array<Array<number>> = [];
    const reAssignedWidgetFrameWidthList: Array<Array<number>> = [];
    let rowWidthSum = 0;
    let reAssignedRowWidth: Array<number> = [];


    for (let i = 0; i < allWidgetFrameWidthRange.length; i += 1) {
        const oneLineSequence: Array<number> = [];
        for (let j = 0; j < allWidgetFrameWidthRange[i].length; j += 1) {
            oneLineSequence.push(0);
        }
        widthSelectPointer.push(oneLineSequence);
    }

    // i -> 각 row 순회
    for (let i = 0; i < allWidgetFrameWidthRange.length; i += 1) {
        rowWidthSum = 0;
        reAssignedRowWidth = [];
        // j -> widgetFrame size 를 80 씩 증가시킴
        for (let j = 0; j < WIDGET_FRAME_WIDTH_RANGE_LIST[0].length; j += 1) {
            // k > allWidgetFrameWidthRange 순회
            for (let k = 0; k < allWidgetFrameWidthRange[i].length; k += 1) {
                rowWidthSum = 0;
                reAssignedRowWidth = [];
                widthSelectPointer[i].unshift(j);
                // l -> 각 row 합 비교 && 한 줄 push
                for (let l = 0; l < allWidgetFrameWidthRange[i].length; l += 1) {
                    rowWidthSum += allWidgetFrameWidthRange[i][l][widthSelectPointer[i][l]];

                    if (rowWidthSum > containerWidth) {
                        reAssignedWidgetFrameWidthList.push(reAssignedRowWidth);
                        break;
                    }

                    if (rowWidthSum === containerWidth) {
                        reAssignedRowWidth.push(allWidgetFrameWidthRange[i][l][widthSelectPointer[i][l]]);
                        reAssignedWidgetFrameWidthList.push(reAssignedRowWidth);
                        break;
                    }

                    reAssignedRowWidth.push(allWidgetFrameWidthRange[i][l][widthSelectPointer[i][l]]);
                }
                if (rowWidthSum >= containerWidth) break;
            }
            if (rowWidthSum >= containerWidth) break;
            // 마지막 원소 고려
            if (j === 2 && reAssignedRowWidth.length) {
                reAssignedWidgetFrameWidthList.push(reAssignedRowWidth);
            }
        }
    }

    return reAssignedWidgetFrameWidthList;
};

export const widgetFrameWidthAssigner = (widgetFrameSizeList: Array<string>, containerWidth: number): Array<Array<number>> => {
    const allWidgetFrameWidthRange = selectAllWidgetFrameWidthRange(widgetFrameSizeList, containerWidth);
    return allWidgetFrameWidthReAligner(allWidgetFrameWidthRange, containerWidth);
};
