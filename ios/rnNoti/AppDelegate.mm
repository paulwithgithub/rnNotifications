#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import <React/RCTLinkingManager.h>
#import <GoogleSignIn/GoogleSignIn.h>
//  #import <FBSDKCoreKit/FBSDKCoreKit.h>
//#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>
//#import <SafariServices/SafariServices.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
self.moduleName = @"rnNoti";
// You can add your custom initial props in the dictionary below.
// They will be passed down to the ViewController used by React Native.
//facebook
// [[FBSDKApplicationDelegate sharedInstance] application:application
// didFinishLaunchingWithOptions:launchOptions];

self.initialProps = @{};
// Setup notification handling
UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
center.delegate = self;

// Request notification permissions
UNAuthorizationOptions options = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
[center requestAuthorizationWithOptions:options
completionHandler:^(BOOL granted, NSError * _Nullable error) {
if (error) {
NSLog(@"Error requesting notification authorization: %@", error);
}
}];

[[UIApplication sharedApplication] registerForRemoteNotifications];

return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// Required for registering for remote notifications
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
[RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for handling remote notifications
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
[RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// Required for handling registration errors
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
[RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}

// Handle user interactions with notifications
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
withCompletionHandler:(void (^)(void))completionHandler
{
[RNCPushNotificationIOS didReceiveNotificationResponse:response];
completionHandler(); // Make sure to call the completion handler
}

// Handle foreground notifications
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
willPresentNotification:(UNNotification *)notification
withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

// - (BOOL)application:(UIApplication *)app
//            openURL:(NSURL *)url
//            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {

//  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
//    return YES;
//  }

//  return NO;

//}


@end
