"use client";
import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModal';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface PROPS {
  params: Promise<{
    'template-slug': string;
  }>;
}

const CreateNewContent = (props: PROPS) => {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(props.params);

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === unwrappedParams['template-slug']
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState('');
  const { user } = useUser();
  const router = useRouter();

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);

    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt;
    console.log(finalAIPrompt);
    const result = await chatSession.sendMessage(finalAIPrompt);
    console.log(result?.response.text());
    setAIOutput(result?.response.text());
    await SaveInDb(formData, selectedTemplate?.slug, result?.response.text());
    setLoading(false);
  };

  const SaveInDb = async (formData: any, slug: any, aiOutput?: string) => {
    const result = await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      aiResponse: aiOutput,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY'),
      templateSlug: slug,
    });
    console.log(result);
  };

  return (
    <div className="p-10">
      <Link href={'/dashboard'}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={GenerateAIContent}
          loading={loading}
        />

        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
