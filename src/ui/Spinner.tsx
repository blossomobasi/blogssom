import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
    return (
        <TailSpin
            visible={true}
            height="80"
            width="80"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        />
    );
};

export default Spinner;
