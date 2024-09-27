import {
  Accordion as RAAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./accordion.scss";

interface AccordionProps {
  items: Record<string, string>;
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const keys = Object.keys(items);

  if (keys.length === 0) return <></>;

  const noValues = keys.filter((k) => !items[k]);
  const withValues = keys.filter((k) => !!items[k]);

  return (
    <RAAccordion className="custom-accordion" allowMultipleExpanded allowZeroExpanded>
      {noValues.map((k) => (
        <div key={k} className="custom-accordion__no-value">
          {k}
        </div>
      ))}
      {withValues.map((k) => {
        return (
          <AccordionItem key={k}>
            <AccordionItemHeading>
              <AccordionItemButton>{k}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p className="custom-accordion__p">{items[k]}</p>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </RAAccordion>
  );
};
