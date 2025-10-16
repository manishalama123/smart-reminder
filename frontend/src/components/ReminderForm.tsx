import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Reminder } from "@/types";
import { useState } from "react";

interface ReminderFormProps {
    open: OnBeforeUnloadEventHandler;
    onClose: () => void;
    onSubmit: (data: Partial<Reminder>) => Promise<void>;
    initialDate?: Date;
    reminder?: Reminder | null;
}

export default function ReminderForm({ open, onClose, onSubmit, initialDate, reminder }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: reminder?.title || '',
        description: reminder?.description || '',
        reminder_datetime: reminder?.reminder_datetime
            ? new Date(reminder.reminder_datetime).toISOString().slice(0, 16)
            : initialDate
                ? new Date(initialDate).toISOString().slice(0, 16)
                : '',
    });

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit({
                ...formData,
                reminder_datetime: new Date(formData.reminder_datetime).toISOString(),
            });
            onClose();
        } catch (error) {
            console.error('Failed to save reminder:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{reminder ? 'Edit Reminder' : 'Create Reminder'}</DialogTitle>
                </DialogHeader>
            </DialogContent>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input 
                        value={formData.title}
                        onChange={(e)=> setFormData({...formData, title:e.target.value})}
                        required
                        />
                </div>

                <div>
                    <Label>Description</Label>
                    <Textarea 
                        value={formData.description}
                        onChange={(e)=> setFormData({...formData, description:e.target.value})}
                        required
                     />
                </div>

                <div>
                    <Label>Date & Time</Label>
                    <Input 
                        type="datetime-local"
                        value={formData.reminder_datetime}
                        onChange={(e)=> setFormData({...formData, reminder_datetime:e.target.value})}
                     />
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={loading}>{loading ? 'Saving...': 'Save'}</Button>
                </div>
            </form>
        </Dialog>
    )
}
