import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/types/category';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/category/${category.slug}`}>
        <Card className="group h-full transition-colors hover:border-primary/40">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <CardTitle>{category.name}</CardTitle>
              <ArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            {category.description ? (
              <CardDescription className="line-clamp-3">{category.description}</CardDescription>
            ) : null}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-primary">Explore collection</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
