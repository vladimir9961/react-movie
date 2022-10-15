import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { Portal } from 'react-portal';

function Popup(props) {
    const [hide, setHide] = useState({})
    useEffect(() => {
        setHide(props)
        setTimeout(function () {
            setHide(false);
        }, 4000);
    }, [props]);
    return (hide.trigger, hide.variant) ? (
        <>
            <Portal className="user-alert">
                <Alert
                    key={hide.variant}
                    variant={hide.variant}>
                    {hide.text}
                </Alert>
            </Portal>
        </>
    ) : "";

}

export default Popup;