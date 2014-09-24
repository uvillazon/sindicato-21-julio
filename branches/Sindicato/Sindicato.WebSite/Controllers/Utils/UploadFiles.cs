using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Diagnostics;

namespace Sindicato.WebSite.Controllers.Utils
{
    public class UploadFiles
    {
        private string PATH_BASE = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Content/Files");
        private HttpFileCollectionBase _files;
        public UploadFiles(HttpFileCollectionBase files)
        {
            this._files = files;
        }

        public void upload(string folder, string fileName = null)
        {
            foreach (string file in _files)
            {
                HttpPostedFileBase hpf = _files[file] as HttpPostedFileBase;
                if (hpf.ContentLength == 0)
                    continue;
                string folderUser = Path.Combine(PATH_BASE, folder);
                if (!Directory.Exists(folderUser))
                {
                    Directory.CreateDirectory(folderUser);
                    Debug.WriteLine("Creando carpeta: " + folderUser);
                }
                string name = fileName != null ? fileName + Path.GetExtension(hpf.FileName) : hpf.FileName;
                string savedFileName = Path.Combine(folderUser, Path.GetFileName(name));
                Debug.WriteLine("savedFileName: " + savedFileName);
                hpf.SaveAs(savedFileName);

            }
        }

    }
}