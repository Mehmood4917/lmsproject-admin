import { useState, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';

const useFormArray = () => {
  const [data, setData] = useState([]);

  useEffect(() => {});

  const bindItem = (parent, item, parentId) => {
    return parent.reduce((a, b) => {
      if (b.id === parentId) {
        b.children = [...(b.children || []), item];
      } 
      else if (b.children && b.children.length) {
        b.children = bindItem(b.children, item, parentId);
      }
      a.push(b);
      return a;
    }, []);
  };

  const removeItemBasedOnData = (items, itemId) => {
    return items.reduce((a, b) => {
      if (b.id === itemId) {
        return a;
      }
      if (b.children && b.children.length) {
        b.children = removeItemBasedOnData(b.children, itemId);
      }
      a.push(b);
      return a;
    }, []);
  };

  const addItem = useCallback((item, parentId = null) => {
    if (item) {
      setData(data =>
        parentId
          ? bindItem(data, { ...item, id: v4() }, parentId) : [...data, { ...item, id: v4() }]
      );
    }
  }, []);

  const removeItem = useCallback(itemId => {
    if (itemId) {
      setData(data => removeItemBasedOnData(data, itemId));
    }
  }, []);

  return {
    data,
    addItem,
    removeItem
  };
};

export default useFormArray;
