export const LIBRARY_CATEGORIES = [
  {id: 'all', label: 'All'},
  {id: 'math', label: 'Math'},
  {id: 'english', label: 'English'},
  {id: 'science', label: 'Science'},
  {id: 'physics', label: 'Physics'},
];

export const LIBRARY_RESOURCES = [
  {
    id: '1',
    title: 'Quadratic Equations Notes',
    subtitle: 'Math - Class 10',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    category: 'math',
    icon: 'document-text-outline',
    iconBg: '#EEF2FF',
    iconColor: '#071A3D',
    isNew: true,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: '2',
    title: 'English Grammar Workbook',
    subtitle: 'English - Class 10',
    fileType: 'eBook',
    fileSize: '5.1 MB',
    category: 'english',
    icon: 'book-outline',
    iconBg: '#E8F8EE',
    iconColor: '#34C759',
    isNew: false,
    pdfUrl: '',
  },
  {
    id: '3',
    title: 'Physics Chapter 5',
    subtitle: 'Science - Class 10',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    category: 'physics',
    icon: 'document-text-outline',
    iconBg: '#8E51FF1A',
    iconColor: '#8E51FF',
    isNew: true,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: '4',
    title: 'Composition Writing Guide',
    subtitle: 'English - Class 9',
    fileType: 'DOC',
    fileSize: '1.2 MB',
    category: 'english',
    icon: 'document-outline',
    iconBg: '#FFF4E5',
    iconColor: '#FF9500',
    isNew: false,
    pdfUrl: '',
  },
];

export const LIBRARY_CLASS_CATEGORIES = [
  {
    id: '1',
    title: 'Class 10A',
    subtitle: '24 resources - Current class',
    isCurrent: true,
  },
];

export const getFilteredResources = (list, search, category) => {
  const query = search.trim().toLowerCase();

  return list.filter(book => {
    if (category !== 'all' && book.category !== category) {
      return false;
    }
    if (!query) {
      return true;
    }

    const text = `${book.title} ${book.subtitle} ${book.fileType}`.toLowerCase();
    return text.includes(query);
  });
};
