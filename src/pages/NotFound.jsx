import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiCompass } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../components/common/EmptyState';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <EmptyState
        icon={<FiCompass />}
        title={t('notFound.title')}
        description={t('notFound.body')}
        actionLabel={t('notFound.cta')}
        onAction={() => navigate('/')}
      />
    </Container>
  );
}
