export const getLeaveType = (LeaveTypeID) => {
    switch (LeaveTypeID) {
      case 1:
        return 'Vacation Leave';
      case 2:
        return 'Mandatory/Forced Leave';
      case 3:
        return 'Sick Leave';
      case 4:
        return 'Maternity Leave';
      case 5:
        return 'Paternity Leave';
      case 6:
        return 'Special Privilege Leave';
      case 7:
        return 'Solo Parent Leave';
      case 8:
        return 'Study Leave';
      case 9:
        return '10-Day VAWC Leave';
      case 10:
        return 'Rehabilitation Privilege';
      case 11:
        return 'Special Leave Benefits for Women';
      case 12:
        return 'Special Emergency (Calamity) Leave';
      case 13:
        return 'Adoption Leave';
      case 14:
        return 'Monetization of Leave Credits';
      case 15:
        return 'Terminal Leave';
      case 16:
        return 'Other purpose';
      default:
        return 'Unknown';
    }
  };
  

  export const getLeaveReason = (ReasonID) => {
    switch (ReasonID) {
      case 1:
        return 'Within the Philippines';
      case 2:
        return 'Abroad';
      case 3:
        return 'In Hospital';
      case 4:
        return 'Out Patient';
      case 5:
        return 'Special Leave Benefits for Women';
      case 6:
        return 'Completion of Masters Degree';
      case 7:
        return 'BAR/Board Examination Review';
      case 8:
        return 'Other purpose';
      case 9:
        return 'Monetization of Leave Credits';
      case 10:
        return 'Terminal Leave';
      default:
        return 'Unknown';
    }
  };
  
  