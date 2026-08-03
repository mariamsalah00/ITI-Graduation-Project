import { useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../context/CategoriesContext';
import { useNotification } from '../../context/NotificationContext';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';

export default function Categories() {
  const { t } = useTranslation();
  const { categories, loading, error, retry, deleteCategory } = useCategories();
  const { notify } = useNotification();
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleConfirmDelete = () => {
    deleteCategory(pendingDelete.id);
    notify(`${pendingDelete.name} deleted`);
    setPendingDelete(null);
  };

  if (loading) return <Loader minHeight={320} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{t('admin.categories')}</Typography>
        <Button component={Link} to="/admin/categories/new" variant="contained" color="primary" startIcon={<FiPlus />}>
          {t('admin.addCategory')}
        </Button>
      </Box>

      {categories.length === 0 ? (
        <EmptyState title={t('admin.noCategories')} />
      ) : (
        <Box sx={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>{category.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{category.description}</TableCell>
                  <TableCell align="right">
                    <IconButton component={Link} to={`/admin/categories/${category.id}/edit`} size="small" aria-label="Edit">
                      <FiEdit2 size={16} />
                    </IconButton>
                    <IconButton size="small" onClick={() => setPendingDelete(category)} aria-label="Delete">
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
