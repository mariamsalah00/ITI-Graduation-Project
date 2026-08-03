import { useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip } from '@mui/material';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../context/ProductsContext';
import { useNotification } from '../../context/NotificationContext';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';

export default function Products() {
  const { t } = useTranslation();
  const { products, loading, error, retry, deleteProduct } = useProducts();
  const { notify } = useNotification();
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleConfirmDelete = () => {
    deleteProduct(pendingDelete.id);
    notify(`${pendingDelete.name} deleted`, 'success');
    setPendingDelete(null);
  };

  if (loading) return <Loader minHeight={320} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{t('admin.products')}</Typography>
        <Button component={Link} to="/admin/products/new" variant="contained" color="primary" startIcon={<FiPlus />}>
          {t('admin.addProduct')}
        </Button>
      </Box>

      {products.length === 0 ? (
        <EmptyState title={t('admin.noProducts')} />
      ) : (
        <Box sx={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      component="img"
                      src={product.image}
                      alt=""
                      sx={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', objectFit: 'cover', bgcolor: 'var(--color-surface-alt)' }}
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                    {product.name}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock > 0 ? product.stock : t('common.outOfStock')}
                      size="small"
                      color={product.stock > 0 ? 'default' : 'error'}
                      variant={product.stock > 0 ? 'outlined' : 'filled'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton component={Link} to={`/admin/products/${product.id}/edit`} size="small" aria-label="Edit">
                      <FiEdit2 size={16} />
                    </IconButton>
                    <IconButton size="small" onClick={() => setPendingDelete(product)} aria-label="Delete">
                      <FiTrash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={t('admin.deleteConfirmTitle')}
        description={t('admin.deleteConfirmBody')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </Box>
  );
}
