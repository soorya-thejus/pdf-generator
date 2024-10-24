import React, { useEffect, useState } from 'react';
import axios from 'axios';


const POTable: React.FC = () => {
  const [pos, setPos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPOs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pos');
        setPos(response.data);
      } catch (err) {
        setError('Error fetching purchase orders');
      } finally {
        setLoading(false);
      }
    };

    fetchPOs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>PO Number</th>
          <th>Description</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {pos.map((po) => (
          <tr key={po.id}>
            <td>{po.poNumber}</td>
            <td>{po.description}</td>
            <td>{po.totalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default POTable;
