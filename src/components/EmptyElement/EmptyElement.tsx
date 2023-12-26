import {FC} from "react";

type EmptyElementProps = {
    text: string,
};

const EmptyElement: FC<EmptyElementProps> = (props) => {
    const {text} = props;
    return (
        <div className={"items__empty"}>
            {text}
        </div>
    );
};

export default EmptyElement;
