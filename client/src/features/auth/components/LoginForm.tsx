import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/features/shared/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/shared/components/ui/Form";
import Input from "@/features/shared/components/ui/Input";
import { useToast } from "@/features/shared/hooks/useToast";
import { trpc } from "@/router";

import { userCredentialsSchema } from "../../../../../shared/schema/auth";

const loginCredentialsSchema = userCredentialsSchema.omit({ name: true });

type LoginFormData = z.infer<typeof loginCredentialsSchema>;

function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.auth.currentUser.invalidate();

      router.navigate({ to: "/" });

      toast({
        title: "Logged in",
        description: "You have logged in",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to login",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="dev@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="*********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loginMutation.isPending}>
          Sign in
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
