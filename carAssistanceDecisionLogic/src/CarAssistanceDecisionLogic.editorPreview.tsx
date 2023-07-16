import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { CarAssistanceDecisionLogicPreviewProps } from "../typings/CarAssistanceDecisionLogicProps";

export function preview({ sampleText }: CarAssistanceDecisionLogicPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/CarAssistanceDecisionLogic.css");
}
