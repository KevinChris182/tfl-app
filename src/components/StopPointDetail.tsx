import useMapStore from '@src/stores/MapStore';
import React, { useEffect, useState } from 'react';
import { Badge, Col, Row, Table } from 'react-bootstrap';

export interface StopPointDetail {
  id: string;
  type: string;
  platformName: string;
  destinationName: string;
  currentLocation: string;
  towards: string;
  direction: string;
  expectedArrival: string;
}

const StopPointDetail: React.FC = () => {
  const [stopPointDetail, setStopPointDetail] = useState([]);
  const { selectedStopPoint } = useMapStore();

  useEffect(() => {
    async function fetchStopPointDetail() {
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${selectedStopPoint.id}/Arrivals`,
      );
      const data = await res.json();
      if (data.length) {
        setStopPointDetail(data);
      }
    }

    if (selectedStopPoint !== null) {
      fetchStopPointDetail();
    }
  }, [selectedStopPoint]);

  return (
    <Row className='g-0 mx-0 mt-3'>
      <Col xs={12} md={{ span: 8, offset: 2 }} className='p-3'>
        <h5 className='mb-3 text-center'>Stop Point Detail</h5>
        {stopPointDetail.length ? (
          <Table
            responsive
            striped
            bordered
            hover
            size='sm'
            className='align-middle'
          >
            <thead>
              <tr className='table-primary'>
                <th>
                  <small>Platform Name</small>
                </th>
                <th>
                  <small>Destination Name</small>
                </th>
                <th>
                  <small>Current Location</small>
                </th>
                <th>
                  <small>Towards</small>
                </th>
                <th>
                  <small>Direction</small>
                </th>
                <th>
                  <small>Expected Arrival</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {stopPointDetail.map((stopPoint) => (
                <tr key={stopPoint.id}>
                  <td>
                    <small>{stopPoint.platformName}</small>
                  </td>
                  <td>
                    <small>{stopPoint.destinationName}</small>
                  </td>
                  <td>
                    <small>{stopPoint.currentLocation}</small>
                  </td>
                  <td>
                    <small>{stopPoint.towards}</small>
                  </td>
                  <td>
                    <small>
                      {stopPoint.direction === 'inbound' ? (
                        <Badge bg='success'>Inbound</Badge>
                      ) : (
                        <Badge bg='info'>Outbound</Badge>
                      )}
                    </small>
                  </td>
                  <td>
                    <small>
                      <b>
                        {new Date(stopPoint.expectedArrival).toLocaleTimeString(
                          'en-GB',
                        )}
                      </b>
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className='text-center mb-5'>No stop point selected</div>
        )}
      </Col>
    </Row>
  );
};

export default StopPointDetail;
