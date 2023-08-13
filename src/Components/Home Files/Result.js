
import {React,useRef,useState} from 'react';
import { useTimeout } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function Result() {
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [clearTimeout] = useTimeout(() => {
        toast.current.show({ severity: 'info', summary: 'Voting Ended!!' });
        <Button  onClick={() => setVisible(true)} icon="pi pi-check" label="Vote" className="mr-2"></Button>
    });

    return (
        <>
            <Toast ref={toast} />
            <div className="card flex justify-content-center">
            {/* <Button  onClick={() => setVisible(true)} icon="pi pi-check" label="Vote" className="mr-2"></Button> */}
            </div>
        </>
    )
}
        