import { TailSpin } from "react-loader-spinner";

function MiniSpinner({ color = "#fff" }: { color?: string }) {
    return (
        <TailSpin
            visible={true}
            height="20"
            width="20"
            color={color}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
        />
    );
}

export default MiniSpinner;
