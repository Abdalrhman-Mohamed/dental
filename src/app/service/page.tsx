"use client";
import { useState, useEffect } from 'react';
import { getProducts, getLabs, getCompanies, deleteProduct, deleteLab, deleteCompany } from '../../api';
import Button from '../_components/ui/Button';
import Modal from '../_components/ui/Modal';
import { useServices } from '@/context/ServicesContext';


interface ServiceItem {
  id: string;
  name?: string;
  title?: string;
  type: 'product' | 'lab' | 'company';
}

export default function ServicePage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { services: allServices, loading: loadingg, error: errorr } = useServices();
  
  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // const [productsRes, labsRes, companiesRes] = await Promise.all([
      //   getProducts(),
      //   getLabs(),
      //   getCompanies(),
      // ]);

      // const allServices: ServiceItem[] = [
      //   ...productsRes.data.map((item: any) => ({ ...item, type: 'product' as const })),
      //   ...labsRes.data.map((item: any) => ({ ...item, type: 'lab' as const })),
      //   ...companiesRes.data.map((item: any) => ({ ...item, type: 'company' as const })),
      // ];

      setServices(allServices);
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل البيانات');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (service: ServiceItem) => {
    setServiceToDelete(service);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;

    try {
      setDeleting(true);

      switch (serviceToDelete.type) {
        case 'product':
          await deleteProduct(serviceToDelete.id);
          break;
        case 'lab':
          await deleteLab(serviceToDelete.id);
          break;
        case 'company':
          await deleteCompany(serviceToDelete.id);
          break;
      }

      // Remove from local state
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    } catch (err: any) {
      console.error('Error deleting service:', err);
      alert('فشل في حذف العنصر: ' + (err.message || 'خطأ غير معروف'));
    } finally {
      setDeleting(false);
    }
  };

  const getServiceTitle = (service: ServiceItem) => {
    return service.name || service.title || 'بدون عنوان';
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'product':
        return 'منتج';
      case 'lab':
        return 'معمل';
      case 'company':
        return 'شركة';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <p className="font-bold">خطأ في تحميل البيانات</p>
            <p className="text-sm">{error}</p>
            <Button
              onClick={fetchAllServices}
              className="mt-4"
              variant="primary"
            >
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">إدارة الخدمات</h1>
        <Button variant="primary">
          إضافة خدمة جديدة
        </Button>
      </div>

      {services?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">لا توجد خدمات متاحة</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className='text-center'>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العنوان
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المعرف
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services?.map((service: any) => (
                  <tr key={`${service.type}-${service.id}`} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getServiceTitle(service)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getServiceTypeLabel(service.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        className="mr-2"
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(service)}
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        closeModal={() => setDeleteModalOpen(false)}
        title="تأكيد الحذف"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            هل أنت متأكد من حذف "{serviceToDelete ? getServiceTitle(serviceToDelete) : ''}"؟
            هذا الإجراء لا يمكن التراجع عنه.
          </p>
          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
              className="ml-2"
            >
              إلغاء
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? 'جاري الحذف...' : 'حذف'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

