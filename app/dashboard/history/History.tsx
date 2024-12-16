'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TEMPLATE } from "../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";

// Interface for history data
export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

interface HistoryProps {
  historyData: HISTORY[];
}

const History: React.FC<HistoryProps> = ({ historyData }) => {
  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | any = Templates?.find((item) => item.slug == slug);
    return template;
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="text-3xl font-bold">History</h2>
      <p className="text-gray-500">Search your previously generated text</p>
      {/* Grid Header with proper column spans */}
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <span className="col-span-2">Template</span>
        <span className="col-span-2">AI RESPONSE</span>
        <span>DATE</span>
        <span>WORDS</span>
        <span>COPY</span>
      </div>

      {/* Render History data */}
      {historyData.map((item: HISTORY, index: number) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-7 gap-4 my-5 py-3 px-3">
            {/* Template */}
            <div className="flex items-center col-span-2">
              <Image
                src={GetTemplateName(item?.templateSlug)?.icon}
                alt="icon"
                width={50}
                height={50}
              />
              <span className="ml-2">{GetTemplateName(item?.templateSlug)?.name}</span>
            </div>

            {/* AI Response */}
            <div className="col-span-2 line-clamp-3">{item?.aiResponse}</div>

            {/* Date */}
            <div>{item?.createdAt}</div>

            {/* Word Count */}
            <div>{item?.aiResponse.length}</div>

            {/* Copy Button */}
            <div>
              <Button
                variant={"ghost"}
                className="text-primary"
                onClick={() => navigator.clipboard.writeText(item?.aiResponse)}
              >
                Copy
              </Button>
            </div>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default History;
