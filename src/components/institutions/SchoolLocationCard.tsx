import React from "react";
import { MapPin, Phone, Building2, Globe, Calendar } from "lucide-react";
import { LocationOption } from "../../api/options";

interface SchoolLocationCardProps {
  location: LocationOption;
}

const SchoolLocationCard: React.FC<SchoolLocationCardProps> = ({
  location,
}) => {
  // Check if it's a work location by checking for hospital property
  const isWorkLocation = "hospital" in location;

  return (
    <div className="bg-white h-auto rounded-lg shadow-sm p-6 pb-8 hover:shadow-md transition-shadow h-[320px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FFF1F1] rounded-full flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-[#EF5157]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-gray-900 text-lg mb-1 line-clamp-2">
              {isWorkLocation ? location.hospital : location.collegeName}
            </h3>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {isWorkLocation
                  ? location.ownershipType || "Hospital"
                  : location.locationType}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600 flex-1">
        {isWorkLocation ? (
          <>
            <div className="flex items-start">
              <Globe className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <span className="line-clamp-2">CCN: {location.CCN}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <span className="line-clamp-2">
                {location.value}, {location.city}, {location.state}{" "}
                {location.zipCode}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0" />
              <span className="truncate">{location.phone || "N/A"}</span>
            </div>
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0" />
              <span className="truncate">
                Certification Date:{" "}
                {new Date(location.certificationDate).toLocaleDateString()}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start">
              <Globe className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <span className="line-clamp-2">{location.collegeName}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0 mt-1" />
              <span className="line-clamp-2">{location.value}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-[#EF5157] flex-shrink-0" />
              <span className="truncate">{location.phone || "N/A"}</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 pt-2 border-t border-gray-100">
        <div className="text-sm flex items-center justify-between">
          {isWorkLocation ? (
            <>
              <span className="text-gray-500">Beds:</span>
              <span className="font-medium text-right truncate ml-2 max-w-[60%]">
                {location.beds || "N/A"}
              </span>
            </>
          ) : (
            <>
              <span className="text-gray-500">Administrator:</span>
              <span className="font-medium text-right truncate ml-2 max-w-[60%]">
                {location.adminName || "Not specified"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolLocationCard;
