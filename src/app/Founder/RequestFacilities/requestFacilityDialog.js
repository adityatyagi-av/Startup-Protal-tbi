import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogOverlay
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

// import { toastStyles } from '@/utils/toastStyles';
import { useDispatch } from 'react-redux';
import { requestResource } from '@/store/Action/getresourceAction';
// import { updateResourceQuantity } from '@/store/Action/FacilityAction';

const RequestFacilities = ({  id }) => {
    const dispatch = useDispatch();;
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(1);

    const handleIncrement = () => {
        setValue(prev => prev + 1);
    };

    const handleDecrement = () => {
        
            setValue(prev => Math.max(0, prev - 1));
        
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue)) {
            setValue(newValue);
        }
    };
    function handleSubmit() {
       dispatch(requestResource(id , value));
       setIsOpen(false);
    }
    useEffect(() => {
        if (!isOpen) {
            setValue(0)
        }
    }, [isOpen])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="cursor-pointer  px-6 py-2 bg-blue-900 rounded-md text-white"
            >
                Request
            </button>

            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >

                <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-fit  sm:w-[500px] px-12   rounded-lg bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-center text-gray-800 font-normal  mr-2  ">
                            Update the new no of available items
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex items-center justify-center  mt-2  gap-4">
                        <Button
                            variant="outline"
                            onClick={handleDecrement}
                            className="h-8 w-8 rounded-full p-0 border border-gray-200"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <Input
                            type="number"
                            value={value}
                            onChange={handleInputChange}
                            className=" w-20 text-center text-lg pl-3 no-arrows"
                        />


                        <Button
                            variant="outline"
                            onClick={handleIncrement}
                            className="h-8 w-8 rounded-full p-0 border border-gray-200"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex gap-3   justify-center mt-2 w-full">
                        <button className=' px-6 py-2 bg-[#2B3674] text-white rounded-md' onClick={handleSubmit}>
                            Request Item
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RequestFacilities;