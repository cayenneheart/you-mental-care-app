
import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateDataSharingPermission } from "../services/api";
import { cn } from "@/lib/utils";

interface DataSharingToggleProps {
  initialValue: boolean;
  onValueChange: (value: boolean) => void;
  className?: string;
}

const DataSharingToggle: React.FC<DataSharingToggleProps> = ({
  initialValue,
  onValueChange,
  className,
}) => {
  const [isOn, setIsOn] = useState(initialValue);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingValue, setPendingValue] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleToggleClick = (newValue: boolean) => {
    setPendingValue(newValue);
    setShowConfirmDialog(true);
  };
  
  const handleConfirm = async () => {
    setIsUpdating(true);
    
    try {
      await updateDataSharingPermission(pendingValue);
      setIsOn(pendingValue);
      onValueChange(pendingValue);
    } catch (error) {
      console.error('Error updating data sharing permission:', error);
    } finally {
      setIsUpdating(false);
      setShowConfirmDialog(false);
    }
  };
  
  const handleCancel = () => {
    setShowConfirmDialog(false);
  };
  
  return (
    <>
      <div className={cn("flex items-center space-x-2", className)}>
        <Switch
          checked={isOn}
          onCheckedChange={handleToggleClick}
          disabled={isUpdating}
          id="data-sharing"
        />
        <label htmlFor="data-sharing" className={isUpdating ? 'opacity-70' : ''}>
          AIの学習用にチャット履歴を提供する
        </label>
      </div>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingValue ? 'データ提供を許可しますか？' : 'データ提供を停止しますか？'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingValue
                ? 'AIの品質向上のため、あなたのチャット履歴を匿名化して使用することを許可します。いつでも設定を変更できます。'
                : 'AIの学習用データの提供を停止します。これまでに提供されたデータは削除されませんが、今後のチャットは学習に使用されません。'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={isUpdating}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isUpdating}>
              {isUpdating ? '更新中...' : '確認'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DataSharingToggle;
