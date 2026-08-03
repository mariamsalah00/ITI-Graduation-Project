import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Button,
} from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useDebounce } from '../hooks/useDebounce';
import { ProductCard } from '../components/common/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';

const PAGE_SIZE = 8;

export default function Shop() {
  const { t } = useTranslation();
  const { products, loading, error, retry } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState('all');
  const [skinType, setSkinType] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  // Keep the URL in sync with the debounced search so the header's search
  // box, the back/forward buttons, and a copy-pasted link all agree with
  // what's actually on screen — not just local component state.
  useEffect(() => {
    setSearchParams(debouncedSearch ? { search: debouncedSearch } : {}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // If the person navigates here again from the header search (new ?search=
  // value while already on /shop), reflect it in the input.
  useEffect(() => {
    const fromUrl = searchParams.get('search') || '';
    setSearch((current) => (fromUrl !== current ? fromUrl : current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('search')]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const skinTypes = useMemo(() => [...new Set(products.flatMap((p) => p.skinType))], [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (skinType !== 'all') list = list.filter((p) => p.skinType.includes(skinType));

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, debouncedSearch, category, skinType, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSkinType('all');
    setSort('default');
    setPage(1);
  };

  if (loading) return <Loader minHeight={480} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {t('shop.title')}
      </Typography>

      {/* Filter bar */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
          pb: 3,
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={t('shop.search')}
          size="small"
          sx={{ flex: '1 1 220px' }}
          InputProps={{ startAdornment: <InputAdornment position="start"><FiSearch /></InputAdornment> }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>{t('shop.filterCategory')}</InputLabel>
          <Select
            label={t('shop.filterCategory')}
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>{t('shop.filterSkinType')}</InputLabel>
          <Select
            label={t('shop.filterSkinType')}
            value={skinType}
            onChange={(e) => { setSkinType(e.target.value); setPage(1); }}
          >
            <MenuItem value="all">All</MenuItem>
            {skinTypes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>{t('shop.sortBy')}</InputLabel>
          <Select label={t('shop.sortBy')} value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="price-asc">{t('shop.sortPriceAsc')}</MenuItem>
            <MenuItem value="price-desc">{t('shop.sortPriceDesc')}</MenuItem>
            <MenuItem value="rating">{t('shop.sortRating')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filtered.length === 0 ? (
        <EmptyState
          title={t('shop.noResultsTitle')}
          description={t('shop.noResultsBody')}
          actionLabel={t('shop.clearFilters')}
          onAction={clearFilters}
        />
      ) : (
        <>
          <Grid container spacing={3}>
            {paged.map((product) => (
              <Grid item xs={6} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Pagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} shape="rounded" />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
