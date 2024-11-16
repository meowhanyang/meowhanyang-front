import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  body: string;
  imageTag: ReactNode;
  buttonTag?: ReactNode;
}

const EmptyState = ({ title, body, imageTag, buttonTag }: EmptyStateProps) => {
  return (
    <section className="flex flex-col items-center justify-center pb-[120px] pt-10">
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
        {imageTag}
        <div className="flex flex-col items-center justify-center gap-[6px] px-4">
          <h3 className="text-heading-3 text-gr-700">{title}</h3>
          <p className="text-body-3 text-gr-500">{body}</p>
        </div>
      </div>
      {buttonTag}
    </section>
  );
};

export default EmptyState;
