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

  return (
    <RAAccordion className="custom-accordion" allowMultipleExpanded allowZeroExpanded>
      {keys.map((k) => {
        if (items[k] === "E" || items[k] === "Е" || !items[k]) {
          return (
            <>
              <div className="custom-accordion__no-value">{k}</div>
            </>
          );
        }
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
