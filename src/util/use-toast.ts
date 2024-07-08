import { toast } from '@/components/ui/use-toast';

export default function useToast (tittle: string, description: string) {
  return toast({
    title: tittle,
    description: description,
    duration: 5000,
    className: 'bg-[#1E1F24] text-white'
  })
}