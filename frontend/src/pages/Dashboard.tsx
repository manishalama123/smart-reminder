import Calendar from "@/components/Calendar";
import ReminderForm from "@/components/ReminderForm";
import { Button } from "@/components/ui/button";
import { remindersAPI } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { Reminder } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    if (user) {
      fetchReminders();
    } else {
      setLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    console.log('formOpen changed:', formOpen);
  }, [formOpen]);

  const fetchReminders = async () => {
    try {
      const response = await remindersAPI.getAll();
      console.log('API Response:', response.data); // Debug log

      // Check if response.data is array or wrapped in object
      const data = Array.isArray(response.data) ? response.data : [];
      setReminders(data);
      
    } catch (error) {
      console.error('Failed to fetch reminders', error);
      console.error('Error response:', error.response);
      setReminders([]);
      
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedDate(slotInfo.start);
    setSelectedReminder(null);
    setFormOpen(true);
  };

  const handleSelectEvent = (event: any) => {
    setSelectedReminder(event.resource);
    setFormOpen(true);
  };
  const handleCreateReminder = async (data: Partial<Reminder>) => {
    await remindersAPI.create(data);
    await fetchReminders();
  };
  const handleUpdateReminder = async (data: Partial<Reminder>) => {
    if (selectedReminder) {
      await remindersAPI.update(selectedReminder.id, data);
      await fetchReminders();
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedReminder(null);
    setSelectedDate(undefined);
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading reminders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <nav className="bg-white shadow px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Smart Reminder</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user?.username}</span>
            <Button onClick={handleLogout} variant="outline" size="sm" >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">

          <h2 className="text-2xl font-bold ">My reminders</h2>
          
          <Button onClick={() => { setSelectedDate(new Date()); setFormOpen(true); }}>
            + New Reminder
          </Button>
        </div>

        <Calendar
          reminders={reminders}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
        <ReminderForm
          open={formOpen}
          onClose={handleCloseForm}
          onSubmit={selectedReminder ? handleUpdateReminder : handleCreateReminder}
          initialDate={selectedDate}
          reminder={selectedReminder}
        />
      </main>
    </div>
  )
}
