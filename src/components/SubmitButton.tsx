"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

type SubmitButtonProps = {
  buttonText: string;
} & React.ComponentProps<typeof Button>;


export function SubmitButton({ buttonText, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const t = useTranslations('General');

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('pleaseWait')}
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
