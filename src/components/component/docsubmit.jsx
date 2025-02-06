import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import MyDropzone from "@/components/component/Dropzones/page"
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const docsubmitModal = ({ regId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
  



    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); 

    const handlePutUnderEvaluation = () => {




        toast.promise(
            dispatch(putUnderEvaluation(regId, date)).then(() => {
                setOpen(false); // Close modal on success
            }),
            {
                loading: loading || "Putting...",
                success: <b>Startup put to underevaluation!</b>,
                error: error ? <b>{error?.message || "Could not Put."}</b> : "An error occurred.",
            }
        );
    };

    const handleFieldChange = (id, value) => {//
        setFormFields(prev =>
            prev.map(field => (field.changeId === id ? { ...field, newValue: value } : field))
        );
    };


    const handleFileDrop = (index, file) => {
        if (!file) {
           
            setUploadedFiles(prev => {
                const updatedFiles = { ...prev };
                delete updatedFiles[index];
                return updatedFiles;
            });
            return;
        }


        const renamedFile = new File(
            [file],
            `${additionalFiles[index].filetitle.replace(/\s+/g, '_')}.${file.name.split('.').pop()}`,
            { type: file.type }
        );

        setUploadedFiles(prev => ({ ...prev, [index]: renamedFile }));
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-full h-[38px] rounded-lg border  bg-blue-900 text-white font-semibold text-lg hover:bg-blue-800"
                >
                    Upload doc
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px] rounded-lg shadow-lg">
            <MyDropzone
                                   
                                    setFile={(file) => handleFileDrop(index, file)}
                                    message="Drop the requested file here"
                                    allowedTypes={new Set(["application/pdf"])}
                                />
               
            </DialogContent>
        </Dialog>
    );
};

export default docsubmitModal;
{/* <Button
variant="outline"
onClick={() => setOpen(false)}
className="text-gray-700 border-gray-200 hover:bg-gray-50"
>
Cancel
</Button>
<Button
onClick={handlePutUnderEvaluation}
className="font-medium text-white bg-green-500 shadow-sm hover:bg-green-600"
>
save
</Button> */}