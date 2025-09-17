import SubmitTopicForm from "@/components/SubmitTopicForm";
import { PlusCircle } from "lucide-react";
import {unstable_setRequestLocale} from 'next-intl/server';
import { useTranslations } from "next-intl";

type Props = {
  params: {locale: string};
};

export default function SubmitTopicPage({params: {locale}}: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('SubmitTopicPage');

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <PlusCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">{t('title')}</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="mt-8">
        <SubmitTopicForm />
      </div>
    </div>
  );
}
