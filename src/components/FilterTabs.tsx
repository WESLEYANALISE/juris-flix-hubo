
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export const FilterTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  className = "" 
}: FilterTabsProps) => {
  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`
            whitespace-nowrap transition-all duration-300 hover:scale-105
            ${activeCategory === category 
              ? 'bg-primary text-primary-foreground shadow-lg' 
              : 'hover:bg-primary/10 hover:border-primary/50'
            }
          `}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
