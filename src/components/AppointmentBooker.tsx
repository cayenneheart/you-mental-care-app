
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { getAvailableAppointments, bookAppointment, addToCalendar } from "../services/api";
import type { Appointment } from "../services/api";

interface AppointmentBookerProps {
  className?: string;
}

const AppointmentBooker: React.FC<AppointmentBookerProps> = ({ className }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'confirm' | 'processing'>('date');

  useEffect(() => {
    if (selectedDate && bookingStep === 'time') {
      loadAppointments();
    }
  }, [selectedDate, bookingStep]);

  const loadAppointments = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const availableAppointments = await getAvailableAppointments(selectedDate);
      setAppointments(availableAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setBookingStep('time');
  };

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setBookingStep('confirm');
  };

  const handleBooking = async () => {
    if (!selectedAppointment) return;

    setBookingStep('processing');
    setIsLoading(true);

    try {
      const checkoutUrl = await bookAppointment(selectedAppointment.id);
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingStep('confirm');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price);
  };

  const renderBookingContent = () => {
    switch (bookingStep) {
      case 'date':
        return (
          <div className="flex flex-col items-center p-4">
            <h3 className="font-medium mb-4">日付を選択してください</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            />
          </div>
        );

      case 'time':
        return (
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                {selectedDate?.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}の予約枠
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setBookingStep('date')}>
                日付を変更
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center my-8">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {appointments.map((appointment) => (
                  <Button
                    key={appointment.id}
                    variant="outline"
                    onClick={() => handleAppointmentSelect(appointment)}
                    className="h-auto py-3 justify-between flex-col"
                  >
                    <span>{appointment.startTime}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatPrice(appointment.price)}
                    </span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );

      case 'confirm':
        if (!selectedAppointment) return null;

        return (
          <div className="flex flex-col p-4">
            <h3 className="font-medium mb-4">予約内容の確認</h3>

            <Card>
              <CardHeader>
                <CardTitle>専門スタッフとのオンライン相談 (30分)</CardTitle>
                <CardDescription>
                  予約内容を確認してください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">日付</span>
                  <span>
                    {new Date(selectedAppointment.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">時間</span>
                  <span>{selectedAppointment.startTime} - {selectedAppointment.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">費用</span>
                  <span className="font-medium text-slate-600">無料（会社負担）</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setBookingStep('time')}
                >
                  戻る
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={isLoading}
                >
                  {isLoading ? '処理中...' : '予約を確定する'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button className={cn("rounded-full bg-slate-700 hover:bg-slate-800 text-white font-light", className)}>
          専門スタッフと話す
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle className="text-slate-700">オンライン相談の予約</DrawerTitle>
          <DrawerDescription className="text-slate-500">
            社内外の専門スタッフとのビデオ相談を予約できます。<br />
            ご希望の日付と時間を選択してください。プライバシーは厳守されます。
          </DrawerDescription>
        </DrawerHeader>

        {renderBookingContent()}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AppointmentBooker;
