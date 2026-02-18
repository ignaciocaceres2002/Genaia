import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building2, Users, Bell, Shield, Download, Key } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function SettingsPage() {
  return (
    <motion.div className="max-w-3xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Organization profile and system configuration</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="font-semibold text-sm">Organization Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs">Organization Name</Label>
              <Input defaultValue="Acme Corporation" className="mt-1" data-testid="input-org-name" />
            </div>
            <div>
              <Label className="text-xs">Industry</Label>
              <Input defaultValue="Technology" className="mt-1" data-testid="input-industry" />
            </div>
            <div>
              <Label className="text-xs">Company Size</Label>
              <Input defaultValue="150-500 employees" className="mt-1" data-testid="input-size" />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="font-semibold text-sm">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">SSO/SAML</p>
                <p className="text-xs text-muted-foreground">Enable Single Sign-On for your organization</p>
              </div>
              <Switch data-testid="switch-sso" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
              </div>
              <Switch defaultChecked data-testid="switch-2fa" />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="font-semibold text-sm">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Weekly SQ Report", desc: "Receive weekly team SQ summaries" },
              { label: "Alert Notifications", desc: "Get notified of critical alerts" },
              { label: "Champion Activity", desc: "Updates from champion network" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="font-semibold text-sm">Data & API</h3>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2 text-sm">
              <Download className="w-4 h-4" /> Export All Data (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-sm">
              <Key className="w-4 h-4" /> Manage API Keys
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Button className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-save-settings">
          Save Changes
        </Button>
      </motion.div>
    </motion.div>
  );
}
