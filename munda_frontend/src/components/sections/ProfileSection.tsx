import { User, MapPin, Phone, Mail, Calendar, Edit, Bell, Shield, Globe } from "lucide-react";

export function ProfileSection() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Profile & Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-soft">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1">John Mwangi</h3>
            <p className="text-muted-foreground mb-4">Premium Farmer • Member since 2022</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Kiambu County, Kenya
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                +254 712 345 678
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                john.mwangi@email.com
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Registered: March 2022
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Farm Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Farm Name</p>
            <p className="font-medium text-foreground">Mwangi Family Farm</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total Land Area</p>
            <p className="font-medium text-foreground">5.2 hectares</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Primary Crops</p>
            <p className="font-medium text-foreground">Maize, Beans, Sorghum</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">IoT Devices</p>
            <p className="font-medium text-foreground">3 Soil Sensors Active</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">Settings</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { icon: Bell, label: "Notifications", desc: "Manage alerts and reminders", value: "Enabled" },
            { icon: Shield, label: "Privacy", desc: "Data sharing preferences", value: "Private" },
            { icon: Globe, label: "Language", desc: "Display language", value: "English" },
          ].map((setting) => (
            <div key={setting.label} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <setting.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.desc}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{setting.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
