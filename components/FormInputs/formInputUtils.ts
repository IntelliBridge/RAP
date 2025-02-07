import { CSSProperties } from "react";

export function getValidationStatus(error: string | undefined, touched: boolean | undefined) {
    return error && touched ? "error" : undefined;
}

/* in place update of style of the input props */
export function updateStyleWithWidth(width: string | undefined, style: CSSProperties | undefined) {
    if (width) {
        if (!style) {
            style = {};
        }
        style = { ...style, width };
        style.maxWidth = style.maxWidth ?? width;
    }
    return style;
}