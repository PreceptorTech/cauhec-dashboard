import React from 'react';
import { MapPin, Phone, Building2, Guitar as Hospital, Globe, Building } from 'lucide-react';
import { SchoolLocation, WorkLocation } from '../../api/options';

interface SchoolLocationCardProps {
  location: SchoolLocation | WorkLocation;
  type: 'schoolLocation' | 'workLocation';
}

const SchoolLocationCard: React.FC<SchoolLocationCardProps> = ({ location, type }) => {
  const isWorkLocation = 'CCN' in location;
  const title = isWorkLocation ? (location as WorkLocation).hospital : (location as SchoolLocation).collegeName;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-[#FFF1F1] rounded-full flex items-center justify-center flex-shrink-0">
            {isWorkLocation ? (
              <Hospital className="w-6 h-6 text-[#EF5157]" />
            ) : (
              <Building2 className="w-6 h-6 text-[#EF5157]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 text-lg mb-1 group relative">
              <span className="truncate block" title={title}>{title}</span>
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {isWorkLocation ? ((location as WorkLocation).ownershipType || 'Hospital') : (location as SchoolLocation).locationType}
              </span>
              {isWorkLocation && (location as WorkLocation).beds && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {(location as WorkLocation).beds} Beds
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600 flex-1">
        {isWorkLocation ? (
          <>
            <div className="flex items-start">
              <Building className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <span className="truncate block">CCN: {(location as WorkLocation).CCN || 'N/A'}</span>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <span className="truncate block">
                  {location.value}, {(location as WorkLocation).city}, {(location as WorkLocation).state} {(location as WorkLocation).zipCode}
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <span className="truncate block">{(location as WorkLocation).phone || 'N/A'}</span>
              </div>
            </div>
            {(location as WorkLocation).cmsRegion && (
              <div className="flex items-start">
                <Globe className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
                <div className="min-w-0 flex-1">
                  <span className="truncate block">CMS Region: {(location as WorkLocation).cmsRegion}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-start">
              <Globe className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <span className="truncate block">{(location as SchoolLocation).collegeName}</span>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <span className="truncate block">{location.value}</span>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <span className="truncate block">{(location as SchoolLocation).phone || 'N/A'}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-sm flex items-center justify-between">
          {isWorkLocation ? (
            <>
              <span className="text-gray-500">County:</span>
              <div className="min-w-0 flex-1 ml-2 text-right">
                <span className="truncate block font-medium">
                  {(location as WorkLocation).county || 'N/A'}
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="text-gray-500">Administrator:</span>
              <div className="min-w-0 flex-1 ml-2 text-right">
                <span className="truncate block font-medium">
                  {(location as SchoolLocation).adminName || 'Not specified'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolLocationCard;