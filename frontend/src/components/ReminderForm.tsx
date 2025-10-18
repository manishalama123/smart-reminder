import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Reminder } from "@/types";
import { useEffect, useState } from "react";

interface ReminderFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Reminder>) => Promise<void>;
    initialDate?: Date;
    reminder?: Reminder | null;
}

export default function ReminderForm({ open, onClose, onSubmit, initialDate, reminder }: ReminderFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reminder_datetime: '',
    });

    // ✅ Reset form when opening/closing or reminder changes
    useEffect(() => {
        if (open) {
            setFormData({
                title: reminder?.title || '',
                description: reminder?.description || '',
                reminder_datetime: reminder?.reminder_datetime
                    ? new Date(reminder.reminder_datetime).toISOString().slice(0, 16)
                    : initialDate
                        ? new Date(initialDate).toISOString().slice(0, 16)
                        : '',
            });
        }
    }, [open, reminder, initialDate]);

    const handleSubmit = async (e: React.FormEvent) => {
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {reminder ? 'Edit Reminder' : 'Create Reminder'}
                    </DialogTitle>
                </DialogHeader>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label>Date & Time</Label>
                        <Input
                            id="datetime"
                            type="datetime-local"
                            value={formData.reminder_datetime}
                            onChange={(e) => setFormData({ ...formData, reminder_datetime: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
