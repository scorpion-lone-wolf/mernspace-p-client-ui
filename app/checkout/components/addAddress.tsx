import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addAddress } from "@/lib/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  address: z.string().min(2, "Address must be at least 2 characters long"),
});

function AddAddress({ customerId }: { customerId: string | undefined }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["address", customerId],
    mutationFn: async ({ customerId, address }: { customerId: string; address: string }) => {
      if (!customerId) return null;
      return await addAddress(customerId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      setOpen(false);
      addressForm.reset();
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    const address = data.address;
    if (!customerId) return;
    mutate({ customerId, address });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        addressForm.reset();
      }}
    >
      <DialogTrigger render={<Button size="sm" variant="link" />}>
        <Plus size="16" />
        <span className="ml-2">Add New Address</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={addressForm.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>We can save your address for next time order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea className="mt-2" {...addressForm.register("address")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAddress;
