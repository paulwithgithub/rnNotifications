#import <UserNotifications/UNUserNotificationCenter.h>
#import <RCTAppDelegate.h>
// #import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// @interface AppDelegate : RCTAppDelegate
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

@end
