import React from 'react';
import { Plus, Minus } from 'lucide-react';
import './accordion.scss'

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button
        className=""
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <div className="accordion-title-content">{title}</div>
        {isOpen ? (
          <Minus className="w-5 h-5 text-[#565c65] flex-shrink-0 ml-4" />
        ) : (
          <Plus className="w-5 h-5 text-[#565c65] flex-shrink-0 ml-4" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.includes(index)}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;