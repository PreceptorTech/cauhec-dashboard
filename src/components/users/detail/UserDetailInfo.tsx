import React from 'react';
import { UserDetail } from '../../../types/userDetail';
import { Briefcase, Award, GraduationCap, Clock, Building2 } from 'lucide-react';

interface UserDetailInfoProps {
  user: UserDetail;
}

const UserDetailInfo: React.FC<UserDetailInfoProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Professional Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Clinical Role</p>
              <p className="font-medium">{user.clinicalRole || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">{user.experience || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialty</p>
              <p className="font-medium">{user.specialty || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Clinical Hours Needed</p>
              <p className="font-medium">{user.numberOfClinicalHoursNeeded || 'Not specified'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Education & Certification</h2>
          <div className="grid grid-cols-2 gap-6">
            {user.role === 'preceptor' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{user.licenseNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certification Number</p>
                  <p className="font-medium">{user.certificationNumber || 'Not provided'}</p>
                </div>
              </>
            )}
            {user.role === 'student' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">School Name</p>
                  <p className="font-medium">{user.schoolName || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">School Location</p>
                  <p className="font-medium">{user.schoolLocation || 'Not provided'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Status Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Subscription Status</p>
              <p className="font-medium capitalize">{user.subscribeStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Verification ID</p>
              <p className="font-medium">{user.verificationId}</p>
            </div>
            {user.role === 'preceptor' && (
              <div>
                <p className="text-sm text-gray-500">Preceptor Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.preceptorStatus === 1 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.preceptorStatus === 1 ? 'Active' : 'Pending'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Personality Assessment</p>
              <p className="font-medium">{user.personalityAssessmentCode}</p>
            </div>
            {user.linkedinUrl && (
              <div>
                <p className="text-sm text-gray-500">LinkedIn Profile</p>
                <a 
                  href={user.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  View Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailInfo;