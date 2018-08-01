using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Sindicato.Common
{
    [DataContract]
    public class ErrorPaged
    {
        [DataMember]
        public bool success { get; set; }

        [DataMember]
        public string msg { get; set; }

        [DataMember]
        public string datos { get; set; }

        [DataMember]
        public int idTabla { get; set; } //Valor numérico retornado por la ejecución de un SP

    }
    [DataContract]
    public class RespuestaSP
    {
        [DataMember]
        public bool success { get; set; }

        [DataMember]
        public string msg { get; set; }

        [DataMember]
        public int id { get; set; }

        [DataMember]
        public object data { get; set; }
    }
}